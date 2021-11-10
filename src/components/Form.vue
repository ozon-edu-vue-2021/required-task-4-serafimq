<template>
  <div class="form">
    <a-form :form="form" @submit.prevent>
      <h2>Личные данные</h2>
      <a-row class="form__block">
        <a-col :span="8" class="form__item">
          <a-form-item>
            <div>Фамилия</div>

            <a-input
              v-decorator="[
                'family',
                {
                  initialValue: formData.personalData.family,
                  rules: [
                    requiredRule,
                    rusSymbolRule(
                      'Только русские символы, начиная с большой буквы'
                    ),
                  ],
                },
              ]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8" class="form__item">
          <a-form-item>
            <div>Имя</div>
            <a-input
              v-decorator="[
                'name',
                {
                  initialValue: formData.personalData.name,
                  rules: [
                    requiredRule,
                    rusSymbolRule(
                      'Только русские символы, начиная с большой буквы'
                    ),
                  ],
                },
              ]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8" class="form__item">
          <a-form-item>
            <div>Отчество</div>
            <a-input
              v-decorator="[
                'middleName',
                {
                  initialValue: formData.personalData.middleName,
                  rules: [
                    requiredRule,
                    rusSymbolRule(
                      'Только русские символы, начиная с большой буквы'
                    ),
                  ],
                },
              ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="10">
          <div class="form__birthday">
            <a-form-item>
              <div>Дата рождения</div>
              <a-date-picker
                :format="'DD/MM/YYYY'"
                style="width: 100%"
                placeholder="дд.мм.гггг"
                v-decorator="[
                  'birthDay',
                  {
                    initialValue: formData.personalData.birthDay,
                    rules: [
                      requiredRule,
                      lessOrEqualDate(
                        currentDate,
                        `Не может быть больше текущей даты`
                      ),
                    ],
                  },
                ]"
              />
            </a-form-item>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col>
          <a-form-item>
            <div>E-mail</div>
            <a-input
              v-decorator="[
                'email',
                {
                  initialValue: formData.personalData.email,
                  rules: [
                    requiredRule,
                    emailRule('Не корректный E-mail адрес'),
                  ],
                },
              ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col>
          <a-form-item>
            <div>Пол</div>
            <a-radio-group
              name="radioGroup"
              v-decorator="[
                'sex',
                {
                  initialValue: formData.sex,
                  rules: [requiredRule],
                },
              ]"
            >
              <a-radio :value="'male'"> Мужской</a-radio>
              <a-radio :value="'female'"> Женский</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
      <h2>Паспортные данные</h2>
      <a-row>
        <a-col :span="10">
          <a-form-item v-click-outside="hideDropdown">
            <div>Гражданство</div>
            <a-input @focus="isDropdownOpen = true" v-model="searchText" />
            <div v-if="isDropdownOpen" class="citizenship__dropdown">
              <ul v-if="nationalityList.length">
                <li
                  v-for="(nationality, index) in filtersNationalityList"
                  :value="nationality"
                  :key="index"
                  @click="onNationalityClick(nationality)"
                >
                  {{ nationality }}
                </li>
              </ul>
              <div v-else>Ничего не найдено!</div>
            </div>
          </a-form-item>
        </a-col>
      </a-row>
      <template v-if="isRussian">
        <a-row>
          <a-col :span="6" class="form__item">
            <a-form-item>
              <div>Серия паспорат</div>
              <a-input
                v-decorator="[
                  'passportSeries',
                  {
                    initialValue: formData.passportData.passportSeries,
                    rules: isRussian
                    ? [requiredRule,
                      numberSymbolRule('Только цифры. '),
                      lengthRule(4, 'Серия паспорта состоит из 4-х символов')]
                    : [],
                  },
                ]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6" class="form__item">
            <a-form-item>
              <div>Номер паспорта</div>
              <a-input
                v-decorator="[
                  'passportNumber',
                  {
                    initialValue: formData.passportData.passportNumber,
                    rules: isRussian
                    ? [requiredRule,
                      numberSymbolRule('Только цифры. '),
                      lengthRule(6, 'Серия паспорта состоит из 6-ти символов')]
                    : [],
                  },
                ]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12" class="form__item">
            <a-form-item>
              <div>Дата выдачи</div>
              <a-date-picker
                :format="'DD/MM/YYYY'"
                style="width: 100%"
                placeholder="дд.мм.гггг"
                v-decorator="[
                  'dateOfIssue',
                  {
                    initialValue: formData.passportData.dateOfIssue,
                    rules: isRussian
                    ? [ requiredRule,
                      lessOrEqualDate(currentDate,`Не может быть больше текущей даты`)]
                    : [],
                  },
                ]"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </template>
      <template v-else>
        <a-row class="form__block">
          <a-col :span="12" class="form__item">
            <a-form-item>
              <div>Фамилия на латинице</div>
              <a-input
                v-decorator="[
                  'familyLatin',
                  {
                    initialValue: formData.passportData.familyLatin,
                    rules: [
                      requiredRule,
                      engSymbolRule('Только английские символы'),
                    ],
                  },
                ]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12" class="form__item">
            <a-form-item>
              <div>Имя на латинице</div>
              <a-input
                v-decorator="[
                  'nameLatin',
                  {
                    initialValue: formData.passportData.nameLatin,
                    rules: [
                      requiredRule,
                      engSymbolRule('Только английские символы'),
                    ],
                  },
                ]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="6" class="form__item">
            <a-form-item>
              <div>Номер паспорта</div>
              <a-input
                v-decorator="[
                  'passportNumber',
                  {
                    initialValue: formData.passportData.passportNumber,
                    rules: [requiredRule],
                  },
                ]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6" class="form__item">
            <a-form-item>
              <div>Страна выдачи</div>
              <a-select
                v-decorator="[
                  'countryOfIssue',
                  {
                    initialValue: formData.passportData.countryOfIssue,
                  },
                ]"
                @change="handleCountryOfIssueChange"
              >
                <a-select-option
                  v-for="(nationality, index) in nationalityList"
                  :value="nationality"
                  :key="index"
                >
                  {{ nationality }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12" class="form__item">
            <a-form-item>
              <div>Тип паспорта</div>
              <a-select
                v-decorator="[
                  'typePassport',
                  {
                    initialValue: formData.passportData.typePassport,
                  },
                ]"
              >
                <a-select-option
                  v-for="(type, index) in passportTypes"
                  :value="type"
                  :key="index"
                >
                  {{ type }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </template>
      <a-row>
        <a-col>
          <a-form-item>
            <div>Меняли ли фамилию или имя?</div>
            <a-radio-group
              name="radioGroup"
              v-decorator="[
                'changeFamily',
                {
                  initialValue: formData.passportData.changeFamily,
                  rules: [requiredRule],
                },
              ]"
              @change="handleChangeFamily"
            >
              <a-radio :value="false"> Нет</a-radio>
              <a-radio :value="true"> Да</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row v-if="isChangeFamily" class="form__block">
        <a-col :span="12" class="form__item">
          <a-form-item>
            <div>Предыдущая фамилия</div>
            <a-input
              v-decorator="[
                'lastFamily',
                {
                  initialValue: formData.passportData.lastFamily,
                  rules: isChangeFamily
                  ? [
                    rusSymbolRule(
                      'Только русские символы, начиная с большой буквы'
                    )]
                  : [],
                },
              ]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12" class="form__item">
          <a-form-item>
            <div>Предыдущее имя</div>
            <a-input
              v-decorator="[
                'lastName',
                {
                  initialValue: formData.passportData.lastName,
                  rules: isChangeFamily
                  ? [
                    rusSymbolRule(
                      'Только русские символы, начиная с большой буквы'
                    )]
                  : [],
                },
              ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-form-item :wrapper-col="{ span: 24, offset: 22 }">
        <a-button type="primary" @click="handleForm"> Отправить</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import citizenships from "../assets/data/citizenships.json";
import passport_types from "../assets/data/passport-types.json";
import moment from "moment";
import ClickOutside from "vue-click-outside";
import FORM from "../constants/form";
import { throttle } from "../helpers/throttle";
import { debounce } from "../helpers/debounce";

export default {
  directives: {
    ClickOutside,
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: "coordinated" }),
      requiredRule: FORM.REQUIRED_RULE,
      emailRule: FORM.EMAIL_RULE,
      rusSymbolRule: FORM.RUS_SYMBOLS_RULE,
      engSymbolRule: FORM.ENG_SYMBOLS_RULE,
      numberSymbolRule: FORM.NUMBER_SYMBOLS_RULE,
      lengthRule: FORM.LEN_RULE,
      lessOrEqualDate: FORM.LESSOREQUALDATE,
      isDropdownOpen: false,
      nationalityList: [],
      filtersNationalityList: [],
      passportTypes: [],
      searchText: "Russia",
      throttleSearchNationality: null,
      debouncedSearchNationality: null,
      formData: {
        personalData: {
          family: "",
          name: "",
          middleName: "",
          birthDay: null,
          email: "",
        },
        sex: "male",
        passportData: {
          passportSeries: "",
          passportNumber: "",
          dateOfIssue: "",
          changeFamily: false,
          lastFamily: "",
          lastName: "",
          familyOnLatin: "",
          countryOfIssue: "",
          typePassport: "",
          familyLatin: "",
          nameLatin: "",
        },
      },
    };
  },
  methods: {
    handleForm() {
      let payload = {};
      payload.nationality = this.searchText;
      this.form.validateFields((error, values) => {
        if (!error) {
          payload = {
            ...payload,
            ...values,
            birthDay: moment(values.birthDay,'YYYY-MM-DD' ).format('DD.MM.YYYY'),
            dateOfIssue: values.dateOfIssue
              ? moment(values.dateOfIssue,'YYYY-MM-DD' ).format('DD.MM.YYYY')
              : null,
          };
          console.log(payload);
        } else {
          console.log("ERROR VALIDATION FORM");
        }
      });
    },
    handleCountryOfIssueChange(e) {
      this.formData.passportData.countryOfIssue = e;
    },
    handleChangeFamily(e) {
      this.formData.passportData.changeFamily = e.target.value;
    },
    onNationalityClick(nationality) {
      console.log(nationality);
      this.searchText = nationality;
      this.hideDropdown();
    },
    hideDropdown() {
      this.isDropdownOpen = false;
    },
    filterNationalityList(e) {
      this.filtersNationalityList = [...this.nationalityList];
      this.filtersNationalityList = this.nationalityList.filter((el) =>
        el.includes(e)
      );
    },
  },
  computed: {
    isRussian() {
      return this.searchText === "Russia";
    },
    isChangeFamily() {
      return this.formData.passportData.changeFamily;
    },
    currentDate() {
      return moment().format("DD.MM.YYYY");
    },
  },
  watch: {
    searchText(newValue) {
      this.debouncedSearchNationality(newValue);
    },
  },
  created() {
    this.nationalityList = [
      ...new Set(citizenships.map((person) => person.nationality)),
    ];
    this.passportTypes = passport_types.map((passport) => passport.type);
    this.throttleSearchNationality = throttle(this.filterNationalityList, 1000);
    this.debouncedSearchNationality = debounce(
      1000,
      this.filterNationalityList
    );

    this.filtersNationalityList = [...this.nationalityList];
  },
};
</script>

<style scoped>
.form {
}

.form__block {
  display: flex;
}

.form__item:not(:last-child) {
  padding-right: 20px;
}
.citizenship__dropdown {
  display: block;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 350px;
  max-height: 250px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
  overflow: auto;
}
</style>
