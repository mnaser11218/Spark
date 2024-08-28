import userProfile from 'app/entities/user-profile/user-profile.reducer';
import spark from 'app/entities/spark/spark.reducer';
import hashtag from 'app/entities/hashtag/hashtag.reducer';
import mentions from 'app/entities/mentions/mentions.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  userProfile,
  spark,
  hashtag,
  mentions,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
