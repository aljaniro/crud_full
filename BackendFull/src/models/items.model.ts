import { Entity,BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity("items")
 class items extends BaseEntity{
    @PrimaryGeneratedColumn()
  id: number;
  @Column()
  Name:string
  @Column()
  Description:string
  @Column()
  quantity:number
  @Column()
  price:number
 
}
export default items