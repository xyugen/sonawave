import { zfd } from "zod-form-data";

export const formSchema = zfd.formData({
  audioFile: zfd.file(),
});
