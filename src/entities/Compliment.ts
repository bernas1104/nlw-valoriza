import { v4 as uuid } from 'uuid';
import { CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import Tag from "./Tag";
import User from "./User";

@Entity('compliments')
export class Compliment {
  @PrimaryColumn()
  id: string;

  @OneToOne(() => User)
  @JoinColumn()
  user_sender: User;

  @OneToOne(() => User)
  @JoinColumn()
  user_receiver: User;

  @OneToOne(() => User)
  @JoinColumn()
  tag_id: Tag;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
