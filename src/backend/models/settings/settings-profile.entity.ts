import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SettingsProfile {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column({ default: false })
  autostart!: boolean;

  @Column({ default: "light" })
  theme!: "light" | "dark";
}
