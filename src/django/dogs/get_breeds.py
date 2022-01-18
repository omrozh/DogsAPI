from requests import get
from json import loads
import os


def getBreeds(redownload_images=False):
    req_breeds = get("https://dog.ceo/api/breeds/list/all")

    breed_data = loads(req_breeds.content)["message"]
    all_breeds = []

    for breed_name in breed_data:
        new_breed = breed_name
        for sub_breed in breed_data[breed_name]:
            new_breed += " " + sub_breed
            all_breeds.append(new_breed)
            new_breed = breed_name

        if len(breed_data[breed_name]) == 0:
            all_breeds.append(new_breed)

    if not os.path.exists("./dog_images"):
        os.mkdir("./dog_images")
    elif not redownload_images:
        return all_breeds
    else:
        os.system("rm -f ./dog_images")
        os.mkdir("./dog_images")

    for breed_image in all_breeds:
        index = 0
        img_list_req = loads(get(f"https://dog.ceo/api/breed/{breed_image.split(' ')[0]}/images").content)["message"]
        for image in img_list_req:
            index += 1
            if not os.path.exists(f"./dog_images/{breed_image}"):
                os.mkdir(f"./dog_images/{breed_image}")

            with open(f"./dog_images/{breed_image}/img{str(index)}.jpg", "wb") as image_file:
                img_req = get(image).content
                image_file.write(img_req)

            if index == 20:
                break

    return all_breeds
