import moment from 'moment';

export default {
  REQUIRED_RULE: { required: true, message: "Необходимо заполнить поле! " },
  LESSOREQUALDATE: (date, msg) => ({
    message: msg,
    validator(rule, valueInput) {
      if (date && valueInput) {
        return (moment(date, 'DD.MM.YYYY').startOf('day').diff(moment(valueInput, 'DD.MM.YYYY').startOf('day'), 'days', true) >= 0);
      }
      return true;
    },
  }),
  RUS_SYMBOLS_RULE: (msg) => ({
    message: msg,
    validator(rule, valueInput) {
      if (valueInput.match(/^[А-ЯЁ][а-яё]*$/)) {
        return true;
      }
      return false;
    },
  }),
  ENG_SYMBOLS_RULE: (msg) => ({
    message: msg,
    validator(rule, valueInput) {
      if (valueInput.match(/^[a-zA-Z]+$/)) {
        return true;
      }
      return false;
    },
  }),
  NUMBER_SYMBOLS_RULE: (msg) => ({
    message: msg,
    validator(rule, valueInput) {
      if (valueInput.match(/^\d+$/)) {
        return true;
      }
      return false;
    },
  }),
  LEN_RULE: (valueRule, msg) => ({
    message: msg,
    validator(rule, valueInput) {
      if (valueRule === valueInput.length) {
        return true;
      }
      return false;
    },
  }),
  EMAIL_RULE: (msg) => ({
    message: msg,
    validator(rule, val) {
      // eslint-disable-next-line max-len
      if (
        val.match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ) {
        return true;
      }
      return false;
    },
  }),
};
