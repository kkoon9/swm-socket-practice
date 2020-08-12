const SOCKET_TYPE = require("../constants/socket-type");
// const { Slide, StudyData } = require("../models/index");
const imagesPath = [
  "https://connect-class-test.s3.ap-northeast-2.amazonaws.com/StudyGroup1/week1/cat1.jpg",
  "https://connect-class-test.s3.ap-northeast-2.amazonaws.com/StudyGroup1/week1/cat2.jpg",
  "https://connect-class-test.s3.ap-northeast-2.amazonaws.com/StudyGroup1/week1/cat3.jpg",
  "https://connect-class-test.s3.ap-northeast-2.amazonaws.com/StudyGroup1/week1/puppy1.jpg"
];
const io = require("../bin/www").io;
const size = imagesPath.length;
let idx = 0;
let url = imagesPath[0];

module.exports = function (socket) {

  socket.emit("initialize", ({ idx, url }));
  socket.on(SOCKET_TYPE.IMAGE_PREV, (data) => {
    // TODO: 자료 이전으로 넘기기
    if (data.index == 0) {
      data.index = size - 1;
    } else {
      data.index -= 1;
    }
    data.urlInfo = imagesPath[data.index];
    idx = data.index;
    url = data.urlnfo;
    io.in("roomNumber").emit(SOCKET_TYPE.IMAGE_CHANGE, data);
  });
  socket.on(SOCKET_TYPE.IMAGE_NEXT, (data) => {
    // TODO: 자료 다음으로 넘기기
    if (data.index >= size - 1) {
      data.index = 0;
    } else {
      data.index += 1;
    }
    data.urlInfo = imagesPath[data.index];
    idx = data.index;
    url = data.urlInfo;
    io.in("roomNumber").emit(SOCKET_TYPE.IMAGE_CHANGE, data);
  });
};
