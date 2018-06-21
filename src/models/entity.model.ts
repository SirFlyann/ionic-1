export class EntityModel {

  public $key: string;

  constructor(
    public uuid: string,
    public title: string,
    public value1: string,
    public value2: string,
  ){}
}
