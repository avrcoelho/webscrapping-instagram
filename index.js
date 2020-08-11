const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://instagram.com/rocketseat_oficial");

  const imgList = await page.evaluate(() => {
    //  toda essa função sera executada no browser

    // pegar todas as imagens que estão na parte d eposts
    const nodeList = document.querySelectorAll("article img");
    // transformar o NodeList em array
    const imgArray = [...nodeList];
    // transformar os nodes (elementos html) em objetos JS
    const imgList = imgArray.map(({ src }) => ({ src }));
    // colocar para fora da função
    return imgList;
  });

  // escreve os dados em um arquivo local
  // formata o json em 2 espaços
  fs.writeFile("instagram.json", JSON.stringify(imgList, null, 2), (error) => {
    if (error) {
      throw new Error("something wnt wrong");
    }

    console.log("well done");
  });

  await browser.close();
})();
