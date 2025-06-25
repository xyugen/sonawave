import { ALLOWED_TYPES, MAX_NUMBER_OF_FILES } from "@/constants/audio-params";
import ffmpegPath from "@ffmpeg-installer/ffmpeg";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

ffmpeg.setFfmpegPath(ffmpegPath.path);

export const POST = async (request: NextRequest) => {
  try {
    const formData = await request.formData();

    const files = formData.getAll("audioFile");

    if (files.length === 0) {
      return NextResponse.json(
        { message: "No files selected." },
        { status: 400 }
      );
    }

    if (files.length > MAX_NUMBER_OF_FILES) {
      return NextResponse.json(
        { message: "Max 5 files allowed." },
        { status: 400 }
      );
    }

    for (const file of files) {
      if (!(file instanceof File) || !ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json(
          { message: "Invalid file format." },
          { status: 400 }
        );
      }
    }

    const processedFiles: string[] = [];

    for (const file of files) {
      if (!(file instanceof File)) {
        return NextResponse.json(
          { message: "Invalid file format." },
          { status: 400 }
        );
      }

      const tempPath = "tmp";

      // Write file to a temporary path
      const tempInputPath = path.join(tempPath, file.name);
      const tempOutputPath = path.join(
        tempPath,
        `${path.parse(file.name).name}_processed.wav`
      );

      const fileBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(fileBuffer);
      fs.writeFile(tempInputPath, buffer, () => {});

      const outputPath = path.join(tempPath, `${file.name}_processed.wav`);

      await new Promise<void>((resolve, reject) => {
        ffmpeg(tempInputPath)
          .audioChannels(1)
          .audioFrequency(16000)
          .audioCodec("pcm_s16le")
          .output(tempOutputPath)
          .on("end", () => {
            processedFiles.push(outputPath);
            resolve();
          })
          .on("error", reject)
          .run();
      });

      fs.unlinkSync(tempInputPath);
    }

    return NextResponse.json({
      message: "Files processed successfully!",
      processedFiles,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error processing files." },
      { status: 500 }
    );
  }
};
