export default (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(
    JSON.stringify([
      "https://imaging.nikon.com/lineup/dslr/df/img/sample/img_01.jpg",
      "https://imaging.nikon.com/lineup/dslr/df/img/sample/img_02.jpg",
      "https://imaging.nikon.com/lineup/dslr/df/img/sample/img_03.jpg",
      "https://imaging.nikon.com/lineup/dslr/df/img/sample/img_04.jpg",
      "https://imaging.nikon.com/lineup/dslr/df/img/sample/img_05.jpg",
      "https://imaging.nikon.com/lineup/dslr/df/img/sample/img_06.jpg",
      "https://imaging.nikon.com/lineup/dslr/df/img/sample/img_07.jpg"
    ])
  );
};
