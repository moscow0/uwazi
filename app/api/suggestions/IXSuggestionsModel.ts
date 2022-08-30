import mongoose from 'mongoose';
import { instanceModel } from 'api/odm';
import { IXSuggestionType } from 'shared/types/suggestionType';

const props = {
  status: { type: String, enum: ['processing', 'failed', 'ready'], default: 'processing' },
  entityId: { type: String },
};

const mongoSchema = new mongoose.Schema(props, {
  emitIndexErrors: true,
  strict: false,
});

// @ts-ignore
mongoSchema.index({ entityId: 1 });
mongoSchema.index({ fileId: 1 });
mongoSchema.index({ propertyName: 1, entityId: 1, fileId: 1 });
mongoSchema.index({ propertyName: 1, date: 1, state: -1 });

const IXSuggestionsModel = instanceModel<IXSuggestionType>('ixsuggestions', mongoSchema);

export { IXSuggestionsModel };
