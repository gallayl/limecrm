import { models } from 'common'
import { Model, Optional } from 'sequelize'

export type ImageCreationAttributes = Optional<models.Image, 'id' | 'creationDate'>

export class ImageModel extends Model<models.Image, ImageCreationAttributes> {}
