// ____CÁCH 1____
// exports.area = (width,height) => width * height;
// exports.circumference = (width,height) => 2 * (width + height);

// ____CÁCH 2____
// module.exports = {
//     area: (width,height) => width * height,
//     circumference: (width,height) => 2 * (width + height)
// }
// Su dung khi co nhieu ham, thuoc tinh can public

// ___CÁCH 3_____
module.exports = {
  area: (width, height) => {
    return width * height;
  },
  circumference: (width, height) => {
    console.log("Calculating ...");
    return 2 * (width + height);
  },
  // CurrentDateTime is a property, not a function
  currentDateTime: Date()
};
// Sử dụng khi hàm thực thi có nhiều dòng (viết nhiều hàm rồi mới return)
