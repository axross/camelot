import { GraphQLScalarType } from 'graphql';
import moment from 'moment';

const DatetimeType = new GraphQLScalarType({
  name: 'Datetime',
  description: 'A value represents the date and time.',
  serialize(instance) {
    return moment(instance).format();
  },
  parseValue(value) {
    return moment(value);
  },
  parseLiteral(ast) {
    // TODO
    console.log(kind);

    return null;
  },
});

export default DatetimeType;
