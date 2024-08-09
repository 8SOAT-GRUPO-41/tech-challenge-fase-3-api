import { Email, Cpf } from "@/domain/value-objects";

export class Customer {
  private constructor(
    readonly customerId: string,
    private name: string,
    private email: Email,
    private cpf: Cpf
  ) {}

  static create(name: string, email: string, cpf: string) {
    const customerId = crypto.randomUUID();
    return new Customer(customerId, name, new Email(email), new Cpf(cpf));
  }

  static restore(customerId: string, name: string, email: string, cpf: string) {
    return new Customer(customerId, name, new Email(email), new Cpf(cpf));
  }

  setName = (name: string) => {
    this.name = name;
  };

  getName = () => this.name;

  getEmail = () => this.email.getValue();

  getCpf = () => this.cpf.getValue();

  toJSON() {
    return {
      customerId: this.customerId,
      name: this.name,
      email: this.getEmail(),
      cpf: this.getCpf(),
    };
  }
}
