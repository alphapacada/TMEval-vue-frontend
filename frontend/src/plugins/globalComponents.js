import Badge from "../components/Badge";
import BaseAlert from "../components/BaseAlert";
import BaseButton from "../components/BaseButton";
import BaseCheckbox from "../components/BaseCheckbox";
import BaseInput from "../components/BaseInput";
import BasePagination from "../components/BasePagination";
import BaseProgress from "../components/BaseProgress";
import BaseRadio from "../components/BaseRadio";
import BaseSlider from "../components/BaseSlider";
import BaseSwitch from "../components/BaseSwitch";
import Card from "../components/Card";
import StatsCard from "../components/StatsCard";
import Icon from "../components/Icon";
import BaseToggle from "../components/BaseToggle";
import Tabs from "../components/Tabs/Tabs";
import TabPane from "../components/Tabs/TabPane";
import BaseDropdown from "../components/BaseDropdown";
import BaseHeader from "../components/BaseHeader";
export default {
  install(Vue) {
    Vue.component(Badge.name, Badge);
    Vue.component(BaseAlert.name, BaseAlert);
    Vue.component(BaseButton.name, BaseButton);
    Vue.component(BaseInput.name, BaseInput);
    Vue.component(BaseCheckbox.name, BaseCheckbox);
    Vue.component(BasePagination.name, BasePagination);
    Vue.component(BaseProgress.name, BaseProgress);
    Vue.component(BaseRadio.name, BaseRadio);
    Vue.component(BaseSlider.name, BaseSlider);
    Vue.component(BaseSwitch.name, BaseSwitch);
    Vue.component(Card.name, Card);
    Vue.component(StatsCard.name, StatsCard);
    Vue.component(Icon.name, Icon);
    Vue.component(BaseToggle.name, BaseToggle);
    Vue.component(Tabs.name, Tabs);
    Vue.component(TabPane.name, TabPane);
    Vue.component(BaseDropdown.name, BaseDropdown);
    Vue.component(BaseHeader.name, BaseHeader);
    
  }
};
