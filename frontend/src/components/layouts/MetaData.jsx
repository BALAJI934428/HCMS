import { Fragment } from "react";
import { Helmet } from "react-helmet-async";
export default function MetaData({ title }) {
  return (
    <Fragment>
      <Helmet>
        <title>{`${title} - HCMS`}</title>
      </Helmet>
    </Fragment>
  );
}
