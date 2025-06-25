import { ALLOWED_TYPES, MAX_NUMBER_OF_FILES } from "@/constants/audio-params";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const formData = await request.formData();

  // Validations
  if (!formData.get("audioFile")) {
    return NextResponse.json(
      { message: "No files selected." },
      { status: 400 }
    );
  }

  // Max number of files
  if (formData.getAll("audioFile").length > MAX_NUMBER_OF_FILES) {
    return NextResponse.json(
      { message: "Max 5 files allowed." },
      { status: 400 }
    );
  }

  // Iterate over the form data
  for (const [key, value] of formData.entries()) {
    // Check if the file is of a supported type
    if (key === "audioFile") {
      const file = value as File;
      if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json(
          { message: "File has an unsupported format." },
          { status: 400 }
        );
      }
    }
  }

  // TODO: Format files

  return NextResponse.json({
    message: "Files uploaded successfully!",
  });
};
