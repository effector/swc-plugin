"use client";
import { withFactory as _effector$factory } from 'effector';
import { reflect, variant } from "@effector/reflect";
import { BreweryCard, Loader } from "#root/shared/ui";
import { $breweryOfTheDay } from "./model";
export const BreweryOfTheDay = _effector$factory({
    sid: "cdgottk6",
    name: "BreweryOfTheDay",
    method: "variant",
    fn: ()=>variant({
            if: $breweryOfTheDay.map((brewery)=>!!brewery),
            then: _effector$factory({
                sid: "8p2x9wzx",
                name: "then",
                method: "reflect",
                fn: ()=>reflect({
                        view: BreweryCard,
                        bind: {
                            name: $breweryOfTheDay.map((brewery)=>brewery?.name ?? "Unknown"),
                            brewery_type: $breweryOfTheDay.map((brewery)=>brewery?.brewery_type ?? "nano"),
                            website_url: $breweryOfTheDay.map((brewery)=>brewery?.website_url ?? null),
                            image: $breweryOfTheDay.map((brewery)=>brewery?.image ?? "")
                        }
                    })
            }),
            else: Loader
        })
});
