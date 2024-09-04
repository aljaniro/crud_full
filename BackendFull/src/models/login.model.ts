import { Entity,BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
import {
  Contains,
  IsInt,
  Length,
  IsEmail,
  IsFQDN,
  IsDate,
  Min,
  Max,
} from "class-validator"
@Entity("login")
class login extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({nullable:false})
  @Length(4, 20)
  username: string;
  @Column({nullable:false})
  @Length(4, 20)
  password: string;
  @Column({nullable:false,default: () => 'visited'})
  role: string;
  @Column({nullable:false,default: () => 'true'})
  status: boolean;
}
export default login;
