import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DivCards, DivCardsPrimary } from "../../pages/stylepersonalized";

const Card = ({ dataPeople }) => {
  const orderPeople = dataPeople.sort((a, b) => {
    if (a.age < b.age) {
      return a.age - b.age;
    } else {
      return 0;
    }
  });

  return (
    <>
      {orderPeople.map(({ picture, fullName, age, occupation, id, color }) => (
        <>
          <Link href={`/profile/${id}`} passHref>
            <div
              key={id}
              className="col-lg-10 col-md-10 mb-3 mb-lg-0 col-sm-10 info-profile"
            >
              <DivCardsPrimary
                bg={color}
                className="card rounded shadow-sm border-0"
              >
                <DivCardsPrimary bg={color} className="card-body p-0">
                  <DivCards
                    bg={color}
                    className="px-5 py-4 text-center card-img-top"
                  >
                    <Image
                      src={picture}
                      alt="images-people"
                      width="120"
                      height="120"
                      className="rounded-circle mb-2 img-thumbnail d-block mx-auto"
                    />
                    <h3 class="text-white mb-0 ">{fullName}</h3>
                    <p class="fs-6 text-white mb-0">
                      <span className="subtitle-card">Age:</span> {age}
                    </p>
                    <p class="fs-6 text-white mb-0">
                      {" "}
                      <span className="subtitle-card">Occupation:</span>{" "}
                      {occupation}
                    </p>
                  </DivCards>
                </DivCardsPrimary>
              </DivCardsPrimary>
            </div>
          </Link>
        </>
      ))}
    </>
  );
};

export default Card;
