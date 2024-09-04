import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity("person")
class person extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false })
  nombre: string;
  @Column({ nullable: false })
  apellido: string;
  @Column({ nullable: false })
  email: string;
  @Column({ nullable: false })
  tipoDocumento: string;
  @Column({ nullable: false })
  documento: number;
  @Column()
  fechaNacimiento: Date;
}
export default person