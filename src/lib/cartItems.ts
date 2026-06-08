import {
    CartItem,
    DiamondCartItem,
    MelleCartItem,
} from "@/interface/diamondInterface";

export function isMelleCartItem(item: CartItem): item is MelleCartItem {
    return "melle" in item && item.melle != null;
}

export function isDiamondCartItem(item: CartItem): item is DiamondCartItem {
    return "diamond" in item && item.diamond != null;
}

export function getCartLineId(item: CartItem): string {
    if (isMelleCartItem(item)) {
        return typeof item.melleId === "string"
            ? item.melleId
            : item.melle._id;
    }
    return typeof item.diamondId === "string"
        ? item.diamondId
        : item.diamond._id;
}
