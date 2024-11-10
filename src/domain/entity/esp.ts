import { Entity } from "../../core/entity";

interface EspProps {
  name: string;
  location: string;
}

export class Esp extends Entity<EspProps> {
  public static create(props: EspProps, id?: string) {
    return new Esp(props, id);
  }
  get name() {
    return this.props.name;
  }
  get location() {
    return this.props.location;
  }
}
