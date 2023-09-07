import { v2 as cloudinary } from "cloudinary";
import { fileUpload } from "../../helpers/fileUpload";

cloudinary.config({
  cloud_name: "firstsiteweb",
  api_key: "724592211852319",
  api_secret: "cL-ex1nw8z4AECXFPsdinaBYaxc",
  secure: true,
});

describe("Pruebas en el helper fileUpdload", () => {
  test("Debe de subir el archivo correctamente a cloudinary", async () => {
    const imgUrl =
      "https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg";

    const resp = await fetch(imgUrl);
    const blob = await resp.blob();
    const file = new File([blob], "foto.jpg");

    const url = await fileUpload(file);

    expect(typeof url).toBe("string");

    const segments = url.split("/");
    const imgId = segments[segments.length - 1].replace(".jpg", "");

    await cloudinary.api.delete_resources(["journal-app/" + imgId], {
      resource_type: "image",
    });
  });

  test("Debe de retornar null", async () => {
    const file = new File([], "foto.jpg");

    const url = await fileUpload(file);

    expect(url).toBe(null);
  });
});
