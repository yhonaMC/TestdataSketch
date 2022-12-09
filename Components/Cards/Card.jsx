import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DivCards, DivCardsPrimary } from "../../pages/stylepersonalized";

const Card = ({ dataCards }) => {
  return (
    <div className="row">
      {dataCards.map(({ picture, fullName, age, occupation, id, color }) => (
        <Link key={id} href={`/profile/${id}`} passHref>
          <div className="col-lg-4 col-md-6 mb-3 mb-lg-0 col-sm-6 col-xs-11 info-profile">
            <DivCardsPrimary
              bg={color}
              className="card rounded shadow-sm border-0"
            >
              <DivCardsPrimary bg={color} className="card-body p-0">
                <DivCards
                  bg={color}
                  className="px-4 py-3 text-center card-img-top"
                >
                  <Image
                    src={picture}
                    alt="images-people"
                    width="100"
                    height="100"
                    className="rounded-circle mb-2 img-thumbnail d-block mx-auto"
                  />
                  <h3 className="text-white mb-0 ">{fullName}</h3>
                  <p className="fs-6 text-white mb-0">
                    <span className="subtitle-card">Age:</span> {age}
                  </p>
                  <p className="fs-6 text-white mb-0">
                    {" "}
                    <span className="subtitle-card">Occupation:</span>{" "}
                    {occupation}
                  </p>
                </DivCards>
              </DivCardsPrimary>
            </DivCardsPrimary>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Card;
