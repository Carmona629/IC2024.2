import { Entity } from "../../core/entity";

interface FileProps {
  name: string;
  url: string;
  esp_id: string;
}

export class File extends Entity<FileProps> {
  public static create(props: FileProps, id?: string) {
    return new File(props, id);
  }
  get name() {
    return this.props.name;
  }
  get url() {
    return this.props.url;
  }
  get esp_id() {
    return this.props.esp_id;
  }
}
