import { PracticeEntity } from "@/domain/entities/practice.entity";
import { getAllPracticesService } from "@/presentation/services/practice.service";
import { isAxiosError } from "axios";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function useAllPractices() {
  const pathname = usePathname();

  const [practices, setPractices] = useState<PracticeEntity[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: PracticeEntity[] = await getAllPracticesService();

        setPractices((prev) => {
          const newPractices = [...prev];
          response.map((practice) => [
            ...newPractices,
            {
              id: practice.id,
              title: practice.title,
              chapter: practice.chapter,
              questionsCount: practice.questionsCount,
              questionsId: practice.questionsId,
            },
          ]);
          return newPractices;
        });
      } catch (error: any) {
        if (isAxiosError(error)) {
          setError(error.response?.data.message);
        } else {
          console.log("Lỗi hệ thống");
        }
      }
    };
    fetchData();
  }, []);

  return { practices, error };
}
