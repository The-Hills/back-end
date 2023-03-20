export enum Gender {
  male = "male",
  female = "female",
  other = "other",
}

export enum AccountType {
  user = "user",
  driver = "driver",
  admin = "admin",
}

export enum BookingStatus {
  onWaiting = "onWaiting",
  onWayPickUp = "onWayPickUp",
  onRide = "onRide",
  completed = "completed",
}

export enum DriverStatus {
  active = "active",
  unActive = "unActive",
  onRide = "onRide",
}

export enum PaymentStatus {
  DOING = 'DOING',
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL'
}
