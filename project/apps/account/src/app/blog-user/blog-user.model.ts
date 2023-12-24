import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AuthUser, UserRole } from "@project/shared/shared-types";

@Schema({
  collection: 'users',
  timestamps: true,
})
export class BlogUserModel extends Document implements AuthUser {
  @Prop()
  public avatar: string;

  @Prop({
    required: true
  })
  public dateOfBirth: Date;

  @Prop({
    required: true,
    unique: true,
  })
  public email: string;

  @Prop({
    required: true
  })
  public firstname: string;

  @Prop({
    required: true
  })
  public lastname: string;

  @Prop({
    required: true,
  })
  public passwordHash: string

  @Prop({
    required: true,
    default: UserRole.User,
    enum: UserRole,
    type: String,
  })
  public role: UserRole;

}

export const BlogUserSchema = SchemaFactory.createForClass(BlogUserModel);
