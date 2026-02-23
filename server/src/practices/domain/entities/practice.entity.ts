export class PracticeEntity {
  id?: string;
  title: string;
  chapter: string;
  questionsCount: number;
  questionsId: string[];
  createdAt?: Date;
  updatedAt?: Date;

  constructor(props: Partial<PracticeEntity>) {
    Object.assign(this, props);
  }
}
