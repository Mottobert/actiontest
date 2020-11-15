export default function sketch(s) {
  let x, y, backgroundColor;
  let teapot;

  const width = 500;
  const height = 500;

  s.preload = () => {
    teapot = s.loadModel('https://drewing.de/hsmz/actiontest/dist/assets/chair2.obj', true);
  }

  s.setup = () => {
    s.createCanvas(width, height, s.WEBGL);
  };

  s.draw = () => {
    s.background(200);
    s.scale(0.4); // Scaled to make model fit into canvas
    s.rotateX(s.frameCount * 0.01);
    s.rotateY(s.frameCount * 0.01);
    s.normalMaterial(); // For effect
    s.model(teapot);
  };
}
