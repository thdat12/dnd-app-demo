export type BlockTypes = "text" | "button";

export type BlockState = {
  id: string;
  type: BlockTypes;
  style: React.CSSProperties;
  containerStyle: React.CSSProperties;
  value?: any;
};

export type DataState = {
  selectedBlockId?: string | null;
  children: BlockState[];
};

export interface PatchState {
  past: DataState[];
  present: DataState;
  future: DataState[];
}
