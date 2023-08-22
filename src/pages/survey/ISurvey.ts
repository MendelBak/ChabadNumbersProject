
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
}

export interface IChildren {
  header: string;
  subHeader?: string;
  key: string;
  type: string;
  mustBeTrue?: string;
  placeholderText?: string;

}

export interface IEducation {
  header: string;
  subHeader?: string;
  key: string;
  type: string;
  src?: string;
  dropdownOptions?: IDropdownOptions[];
}

export interface IIncome {
  header: string;
  subHeader?: string;
  key: string;
  type: string;
  range?: number[];
  steps?: string;
}

export interface IShlichus {
  header: string;
  subHeader?: string;
  key: string;
  type: string;
}

export interface IBackground {
  header: string;
  subHeader?: string;
  key: string;
  type: string;
  dropdownOptions?: IDropdownOptions[];
}

export interface ISurvey {
  age: IAge[];
  children: IChildren[];
  education: IEducation[];
  income: IIncome[];
  shlichus: IShlichus[];
  background: IBackground[];
}
