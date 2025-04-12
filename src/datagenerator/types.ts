export interface DataInstance {
  [key: string]: string | number;
}

export interface CategoryValueSubset {
  categoryValue: string;
  subset: DataInstance[];
}

export interface CategorySubset {
  categoryName: string;
  subset: CategoryValueSubset[];
}
