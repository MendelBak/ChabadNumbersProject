
export interface IDropdownOptions {
  value: any;
  label: string;
}
export interface IAge {
  header: string;
  subHeader?: string;
  key: string;
  type: string;
  placeholderText: string;
  response?: number;
}

export interface IChildren {
  header: string;
  subHeader?: string;
  key: string;
  type: string;
  mustBeTrue?: string;
  placeholderText?: string;
  response?: boolean | string | [number];

}

export interface IEducation {
  header: string;
  subHeader?: string;
  key: string;
  type: string;
  dropdownOptions?: IDropdownOptions[];
  response?: string | boolean;
}

export interface IIncome {
  header: string;
  subHeader?: string;
  key: string;
  type: string;
  range?: number[];
  steps?: string;
  response?: string;
}

export interface IShlichus {
  header: string;
  subHeader?: string;
  key: string;
  type: string;
  response?: boolean;
}

export interface IBackground {
  header: string;
  subHeader?: string;
  key: string;
  type: string;
  dropdownOptions?: IDropdownOptions[];
  response?: string;
}

export interface ISurvey {
  Age: IAge[];
  Children: IChildren[];
  Education: IEducation[];
  Income: IIncome[];
  Shlichus: IShlichus[];
  Background: IBackground[];
}
