const bookingService = {
  caclulatedPrice: (distance: number, price: number) => {
    let discount = 0;

    if (distance >= 3 && distance <= 5) {
      discount = (price * 5) / 100;
    } else if (distance > 6) {
      discount = (price * 10) / 100;
    }

    const total = distance * (price - discount);

    console.log(total);

    return total;
  },

  
};

export default bookingService;
