import Component from "@ember/component";
import Category from "discourse/models/category";
import discourseComputed, { observes } from "discourse-common/utils/decorators";
import { inject as service } from "@ember/service";
import { defaultHomepage } from "discourse/lib/utilities";
import { and } from "@ember/object/computed";

export default Component.extend({
  router: service(),
  tagName: "",

  didInsertElement() {
    this._super(...arguments);
    this._updateBodyClasses();
  },
  willDestroyElement() {
    this._super(...arguments);
    this._updateBodyClasses();
  },

  @observes("shouldShow")
  _updateBodyClasses() {

  },

  get categoriesLoaded() {
    return Category.list().length !== 0;
  },

  get categories() {
    if (!this.categoriesLoaded) {
      return false;
    }

    let ids = settings.category.split('|');
    if (!ids) {
      ids = [settings.category];
    }

    let categories = [];
    ids.forEach(id => {
      const category = Category.findById(id);
      if (category) {
        categories.push(category);
      }
    })

    return categories;
  },

  @discourseComputed("router.currentRouteName")
  shouldShow(currentRouteName) {
    return currentRouteName === `discovery.${defaultHomepage()}`;
  },

  showTopicLists: and("shouldShow", "categories")
});
