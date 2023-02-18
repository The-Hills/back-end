import { ILocation } from "../utils/interfaces";
import { degreesToRadians } from "./../utils/helper";

const bookingService = {
  calcDistance: (startPoint: ILocation, endPoint: ILocation) => {
    if (
      startPoint.latitude === endPoint.latitude &&
      startPoint.longitude === endPoint.longitude
    ) {
      return 0;
    } else {
      const startingLat = degreesToRadians(startPoint.latitude);
      const startingLong = degreesToRadians(startPoint.longitude);
      const destinationLat = degreesToRadians(endPoint.latitude);
      const destinationLong = degreesToRadians(endPoint.longitude);

      const radius = 6571;

      const distanceInKilometers =
        Math.acos(
          Math.sin(startingLat) * Math.sin(destinationLat) +
            Math.cos(startingLat) *
              Math.cos(destinationLat) *
              Math.cos(startingLong - destinationLong)
        ) * radius;
      return distanceInKilometers;
    }
  },

  caclulatedPrice: () => {},
};

export default bookingService;
