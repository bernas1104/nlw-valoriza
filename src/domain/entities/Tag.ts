/* eslint-disable camelcase */
import { v4 as uuid } from 'uuid';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';

@Entity('tags')
export default class Tag {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'nameCustom' })
  nameCustom(): string {
    return `#${this.name.split(' ').join('')}`;
  }

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
