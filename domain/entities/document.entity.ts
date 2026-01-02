export interface ExtractedOptionsData {
  template: string;
  variables: Record<string, string>;
}

export interface ExtractedData {
  type: string;
  level: string;
  section: string;
  question: {
    template: string;
    variables: {
      math: string[];
      image: string[];
    };
  };
  options?: ExtractedOptionsData[];
}
