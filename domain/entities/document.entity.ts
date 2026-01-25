export interface ExtractedOptionsData {
  template: string;
  variables: Record<string, string>;
}

export interface ExtractedData {
  level: string;
  section: string;
  require: string[];
  question: {
    template: string;
    variables: {
      math: string[];
      image: string[];
    };
  };
  options: ExtractedOptionsData[];
}
