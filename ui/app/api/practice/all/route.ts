import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

import { PracticeRepositoryImpl } from "@/infrastructure/repositories/practiceRepositoryImpl";
import { GetAllPracticesUsecase } from "@/application/usecases/practice/getAllPractices";

export async function GET(req: NextRequest) {
  try {
    const repo = new PracticeRepositoryImpl();
    const usecase = new GetAllPracticesUsecase(repo);
    const response = await usecase.execute();
    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    if (isAxiosError(err)) {
      return NextResponse.json(
        { message: err.response?.data.message },
        { status: err.status },
      );
    }
    return NextResponse.json({ message: "Lỗi Server" }, { status: 500 });
  }
}
