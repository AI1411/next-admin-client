export type Epic = {
  id: number;
  is_open: boolean;
  author_id: string;
  epic_title: string;
  epic_description: string;
  label: string;
  milestone_id: string;
  assignee_id: string;
  project_id: string;
}
