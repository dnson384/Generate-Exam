export class ExtractedOptionsData {
  template: string;
  variables: Record<string, string>;
}

export class ExtractedData {
  type: string;
  level: string;
  section: string;
  question: {
    template: string;
    variables: {
      math: Record<string, string>;
      image: Record<string, string>;
    };
  };
  options?: ExtractedOptionsData[];
}
