import Component from "@ember/component";
import { ajax } from "discourse/lib/ajax";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import { readOnly } from "@ember/object/computed";

export default Component.extend({
  moreHref: readOnly("category.url"),

  init() {
    this._super(...arguments);

    if (!this.category) {
      return
    };

    this.set("isLoading", true)

    const filter = {
      filter: "latest",
      params: {
        category: this.category.id,
      },
    };

    this.store.findFiltered("topicList", filter).then((topicList) => {
      this.set(
        "topicList",
        topicList.topics.slice(0, settings.max_list_length)
      );

      this.set("isLoading", false)
    });
  },

  @action
  createTopic() {
    if (this.currentUser) {
      Discourse.__container__.lookup("controller:composer").open({
        action: "createTopic",
        draftKey: "createTopic",
        categoryId: this.category.id,
      });
    } else {
      this.router.transitionTo("login");
    }
  },
});
