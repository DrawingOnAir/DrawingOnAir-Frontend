/* eslint-disable */
import { Finger, FingerCurl, FingerDirection } from "./FingerDescription";

export default class FingerPoseEstimator {
  constructor(options) {
    this.options = {
      ...{
        // curl estimation
        HALF_CURL_START_LIMIT: 60.0,
        NO_CURL_START_LIMIT: 130.0,

        // direction estimation
        DISTANCE_VOTE_POWER: 1.1,
        SINGLE_ANGLE_VOTE_POWER: 0.9,
        TOTAL_ANGLE_VOTE_POWER: 1.6,
      },
      ...options,
    };
  }

  estimate(landmarks) {
    // step 1: calculate slopes
    const { keypoints3D } = landmarks;

    let slopesXY = [];
    let slopesYZ = [];

    for (let finger of Finger.all) {
      let points = Finger.getPoints(finger);
      let slopeAtXY = [];
      let slopeAtYZ = [];

      for (let point of points) {
        // lanmarks
        let point1 = keypoints3D[point[0]];
        let point2 = keypoints3D[point[1]];

        // calculate single slope
        let slopes = this.getSlopes(point1, point2);
        let slopeXY = slopes[0];
        let slopeYZ = slopes[1];
        slopeAtXY.push(slopeXY);
        slopeAtYZ.push(slopeYZ);
      }

      slopesXY.push(slopeAtXY);
      slopesYZ.push(slopeAtYZ);
    }

    // step 2: calculate orientations

    let fingerCurls = [];
    let fingerDirections = [];

    for (let finger of Finger.all) {
      // start finger predictions from palm - except for thumb
      let pointIndexAt = finger == Finger.Thumb ? 1 : 0;

      let fingerPointsAt = Finger.getPoints(finger);
      let startPoint = keypoints3D[fingerPointsAt[pointIndexAt][0]];
      let midPoint = keypoints3D[fingerPointsAt[pointIndexAt + 1][1]];
      let endPoint = keypoints3D[fingerPointsAt[3][1]];
      // check if finger is curled
      let fingerCurled = this.estimateFingerCurl(
        startPoint,
        midPoint,
        endPoint,
      );

      let fingerPosition = this.calculateFingerDirection(
        startPoint,
        midPoint,
        endPoint,
        slopesXY[finger].slice(pointIndexAt),
      );

      fingerCurls[finger] = fingerCurled;
      fingerDirections[finger] = fingerPosition;
    }

    return { curls: fingerCurls, directions: fingerDirections };
  }

  // point1, point2 are 2d or 3d point arrays (xy[z])
  // returns either a single scalar (2d) or array of two slopes (3d)
  getSlopes(point1, point2) {
    let slopeXY = this.calculateSlope(point1.x, point1.y, point2.x, point2.y);
    if (point1.length == 2) {
      return slopeXY;
    }

    let slopeYZ = this.calculateSlope(point1.y, point1.z, point2.z, point2.z);
    return [slopeXY, slopeYZ];
  }

  angleOrientationAt(angle, weightageAt = 1.0) {
    let isVertical = 0;
    let isDiagonal = 0;
    let isHorizontal = 0;

    if (angle >= 75.0 && angle <= 105.0) {
      isVertical = 1 * weightageAt;
    } else if (angle >= 25.0 && angle <= 155.0) {
      isDiagonal = 1 * weightageAt;
    } else {
      isHorizontal = 1 * weightageAt;
    }

    return [isVertical, isDiagonal, isHorizontal];
  }

  estimateFingerCurl(startPoint, midPoint, endPoint) {
    let start_mid_x_dist = startPoint.x - midPoint.x;
    let start_end_x_dist = startPoint.x - endPoint.x;
    let mid_end_x_dist = midPoint.x - endPoint.x;

    let start_mid_y_dist = startPoint.y - midPoint.y;
    let start_end_y_dist = startPoint.y - endPoint.y;
    let mid_end_y_dist = midPoint.y - endPoint.y;

    let start_mid_z_dist = startPoint.z - midPoint.z;
    let start_end_z_dist = startPoint.z - endPoint.z;
    let mid_end_z_dist = midPoint.z - endPoint.z;

    let start_mid_dist = Math.sqrt(
      start_mid_x_dist * start_mid_x_dist +
        start_mid_y_dist * start_mid_y_dist +
        start_mid_z_dist * start_mid_z_dist,
    );
    let start_end_dist = Math.sqrt(
      start_end_x_dist * start_end_x_dist +
        start_end_y_dist * start_end_y_dist +
        start_end_z_dist * start_end_z_dist,
    );
    let mid_end_dist = Math.sqrt(
      mid_end_x_dist * mid_end_x_dist +
        mid_end_y_dist * mid_end_y_dist +
        mid_end_z_dist * mid_end_z_dist,
    );

    let cos_in =
      (mid_end_dist * mid_end_dist +
        start_mid_dist * start_mid_dist -
        start_end_dist * start_end_dist) /
      (2 * mid_end_dist * start_mid_dist);

    if (cos_in > 1.0) {
      cos_in = 1.0;
    } else if (cos_in < -1.0) {
      cos_in = -1.0;
    }

    let angleOfCurve = Math.acos(cos_in);
    angleOfCurve = (57.2958 * angleOfCurve) % 180;

    let fingerCurl;
    if (angleOfCurve > this.options.NO_CURL_START_LIMIT) {
      fingerCurl = FingerCurl.NoCurl;
    } else if (angleOfCurve > this.options.HALF_CURL_START_LIMIT) {
      fingerCurl = FingerCurl.HalfCurl;
    } else {
      fingerCurl = FingerCurl.FullCurl;
    }

    return fingerCurl;
  }

  estimateHorizontalDirection(
    start_end_x_dist,
    start_mid_x_dist,
    mid_end_x_dist,
    max_dist_x,
  ) {
    let estimatedDirection;
    if (max_dist_x == Math.abs(start_end_x_dist)) {
      if (start_end_x_dist > 0) {
        estimatedDirection = FingerDirection.HorizontalLeft;
      } else {
        estimatedDirection = FingerDirection.HorizontalRight;
      }
    } else if (max_dist_x == Math.abs(start_mid_x_dist)) {
      if (start_mid_x_dist > 0) {
        estimatedDirection = FingerDirection.HorizontalLeft;
      } else {
        estimatedDirection = FingerDirection.HorizontalRight;
      }
    } else {
      if (mid_end_x_dist > 0) {
        estimatedDirection = FingerDirection.HorizontalLeft;
      } else {
        estimatedDirection = FingerDirection.HorizontalRight;
      }
    }

    return estimatedDirection;
  }

  estimateVerticalDirection(
    start_end_y_dist,
    start_mid_y_dist,
    mid_end_y_dist,
    max_dist_y,
  ) {
    let estimatedDirection;
    if (max_dist_y == Math.abs(start_end_y_dist)) {
      if (start_end_y_dist < 0) {
        estimatedDirection = FingerDirection.VerticalDown;
      } else {
        estimatedDirection = FingerDirection.VerticalUp;
      }
    } else if (max_dist_y == Math.abs(start_mid_y_dist)) {
      if (start_mid_y_dist < 0) {
        estimatedDirection = FingerDirection.VerticalDown;
      } else {
        estimatedDirection = FingerDirection.VerticalUp;
      }
    } else {
      if (mid_end_y_dist < 0) {
        estimatedDirection = FingerDirection.VerticalDown;
      } else {
        estimatedDirection = FingerDirection.VerticalUp;
      }
    }

    return estimatedDirection;
  }

  estimateDiagonalDirection(
    start_end_y_dist,
    start_mid_y_dist,
    mid_end_y_dist,
    max_dist_y,
    start_end_x_dist,
    start_mid_x_dist,
    mid_end_x_dist,
    max_dist_x,
  ) {
    let estimatedDirection;
    let reqd_vertical_direction = this.estimateVerticalDirection(
      start_end_y_dist,
      start_mid_y_dist,
      mid_end_y_dist,
      max_dist_y,
    );
    let reqd_horizontal_direction = this.estimateHorizontalDirection(
      start_end_x_dist,
      start_mid_x_dist,
      mid_end_x_dist,
      max_dist_x,
    );

    if (reqd_vertical_direction == FingerDirection.VerticalUp) {
      if (reqd_horizontal_direction == FingerDirection.HorizontalLeft) {
        estimatedDirection = FingerDirection.DiagonalUpLeft;
      } else {
        estimatedDirection = FingerDirection.DiagonalUpRight;
      }
    } else {
      if (reqd_horizontal_direction == FingerDirection.HorizontalLeft) {
        estimatedDirection = FingerDirection.DiagonalDownLeft;
      } else {
        estimatedDirection = FingerDirection.DiagonalDownRight;
      }
    }

    return estimatedDirection;
  }

  calculateFingerDirection(startPoint, midPoint, endPoint, fingerSlopes) {
    let start_mid_x_dist = startPoint.x - midPoint.x;
    let start_end_x_dist = startPoint.x - endPoint.x;
    let mid_end_x_dist = midPoint.x - endPoint.x;

    let start_mid_y_dist = startPoint.y - midPoint.y;
    let start_end_y_dist = startPoint.y - endPoint.y;
    let mid_end_y_dist = midPoint.y - endPoint.y;

    let max_dist_x = Math.max(
      Math.abs(start_mid_x_dist),
      Math.abs(start_end_x_dist),
      Math.abs(mid_end_x_dist),
    );
    let max_dist_y = Math.max(
      Math.abs(start_mid_y_dist),
      Math.abs(start_end_y_dist),
      Math.abs(mid_end_y_dist),
    );

    let voteVertical = 0.0;
    let voteDiagonal = 0.0;
    let voteHorizontal = 0.0;

    let start_end_x_y_dist_ratio = max_dist_y / (max_dist_x + 0.00001);
    if (start_end_x_y_dist_ratio > 1.5) {
      voteVertical += this.options.DISTANCE_VOTE_POWER;
    } else if (start_end_x_y_dist_ratio > 0.66) {
      voteDiagonal += this.options.DISTANCE_VOTE_POWER;
    } else {
      voteHorizontal += this.options.DISTANCE_VOTE_POWER;
    }

    let start_mid_dist = Math.sqrt(
      start_mid_x_dist * start_mid_x_dist + start_mid_y_dist * start_mid_y_dist,
    );
    let start_end_dist = Math.sqrt(
      start_end_x_dist * start_end_x_dist + start_end_y_dist * start_end_y_dist,
    );
    let mid_end_dist = Math.sqrt(
      mid_end_x_dist * mid_end_x_dist + mid_end_y_dist * mid_end_y_dist,
    );

    let max_dist = Math.max(start_mid_dist, start_end_dist, mid_end_dist);
    let calc_start_point_x = startPoint.x,
      calc_start_point_y = startPoint.y;
    let calc_end_point_x = endPoint.x,
      calc_end_point_y = endPoint.y;

    if (max_dist == start_mid_dist) {
      (calc_end_point_x = endPoint.x), (calc_end_point_y = endPoint.y);
    } else if (max_dist == mid_end_dist) {
      (calc_start_point_x = midPoint.x), (calc_start_point_y = midPoint.y);
    }

    let calcStartPoint = [calc_start_point_x, calc_start_point_y];
    let calcEndPoint = [calc_end_point_x, calc_end_point_y];

    let totalAngle = this.getSlopes(calcStartPoint, calcEndPoint);
    let votes = this.angleOrientationAt(
      totalAngle,
      this.options.TOTAL_ANGLE_VOTE_POWER,
    );
    voteVertical += votes[0];
    voteDiagonal += votes[1];
    voteHorizontal += votes[2];

    for (let fingerSlope of fingerSlopes) {
      let votes = this.angleOrientationAt(
        fingerSlope,
        this.options.SINGLE_ANGLE_VOTE_POWER,
      );
      voteVertical += votes[0];
      voteDiagonal += votes[1];
      voteHorizontal += votes[2];
    }

    // in case of tie, highest preference goes to Vertical,
    // followed by horizontal and then diagonal
    let estimatedDirection;
    if (voteVertical == Math.max(voteVertical, voteDiagonal, voteHorizontal)) {
      estimatedDirection = this.estimateVerticalDirection(
        start_end_y_dist,
        start_mid_y_dist,
        mid_end_y_dist,
        max_dist_y,
      );
    } else if (voteHorizontal == Math.max(voteDiagonal, voteHorizontal)) {
      estimatedDirection = this.estimateHorizontalDirection(
        start_end_x_dist,
        start_mid_x_dist,
        mid_end_x_dist,
        max_dist_x,
      );
    } else {
      estimatedDirection = this.estimateDiagonalDirection(
        start_end_y_dist,
        start_mid_y_dist,
        mid_end_y_dist,
        max_dist_y,
        start_end_x_dist,
        start_mid_x_dist,
        mid_end_x_dist,
        max_dist_x,
      );
    }

    return estimatedDirection;
  }

  calculateSlope(point1x, point1y, point2x, point2y) {
    let value = (point1y - point2y) / (point1x - point2x);
    let slope = (Math.atan(value) * 180) / Math.PI;

    if (slope <= 0) {
      slope = -slope;
    } else if (slope > 0) {
      slope = 180 - slope;
    }

    return slope;
  }
}
