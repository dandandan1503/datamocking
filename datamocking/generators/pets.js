var DOG_BREEDS = ['Toaster', 'Bradley', 'Affenpinscher', 'Afghan Hound', 'Airedale Terrier', 'Akita', 'Alaskan Malamute', 'American Cocker Spaniel', 'American Eskimo Dog (Miniature)', 'American Eskimo Dog (Standard)', 'American Eskimo Dog (Toy)', 'American Foxhound', 'American Staffordshire Terrier', 'American Water Spaniel', 'Anatolian Shepherd', 'Australian Cattle Dog', 'Australian Shepherd', 'Australian Terrier', 'Basenji', 'Basset Hound', 'Beagle', 'Bearded Collie', 'Bedlington Terrier', 'Belgian Malinois', 'Belgian Sheepdog', 'Belgian Tervuren', 'Bernese Mountain Dog', 'Bichon Frise', 'Black and Tan Coonhound', 'Bloodhound', 'Border Collie', 'Border Terrier', 'Borzoi', 'Boston Terrier', 'Bouvier des Flandres', 'Boxer', 'Briard', 'Brittany', 'Brussels Griffon', 'Bull Terrier', 'Bulldog', 'Bullmastiff', 'Cairn Terrier', 'Canaan Dog', 'Cardigan Welsh Corgi', 'Cavalier King Charles Spaniel', 'Chesapeake Bay Retriever', 'Chihuahua', 'Chinese Crested Dog', 'Chinese Shar-Pei', 'Chow Chow', 'Clumber Spaniel', 'Collie', 'Curly-Coated Retriever', 'Dachshund (Standard)', 'Dachsund (Miniature)', 'Dalmatian', 'Dandie Dinmont Terrier', 'Doberman Pinscher', 'English Cocker Spaniel', 'English Foxhound ', 'English Setter', 'English Springer Spaniel', 'English Toy Spaniel', 'Field Spaniel', 'Finnish Spitz', 'Flat-Coated Retriever', 'French Bulldog', 'German Shepherd Dog', 'German Shorthaired Pointer', 'German Wirehaired Pointer', 'Giant Schnauzer', 'Golden Retriever', 'Gordon Setter', 'Great Dane', 'Great Pyrenees', 'Greater Swiss Mountain Dog', 'Greyhound', 'Harrier', 'Havanese', 'Ibizan Hound', 'Irish Setter', 'Irish Terrier', 'Irish Water Spaniel', 'Irish Wolfhound', 'Italian Greyhound', 'Jack Russell Terrier', 'Japanese Chin', 'Keeshond', 'Kerry Blue Terrier', 'Komondor', 'Kuvasz', 'Labrador Retriever', 'Lakeland Terrier', 'Lhasa Apso', 'Lowchen', 'Maltese', 'Manchester Terrier (Standard)', 'Manchester Terrier (Toy)', 'Mastiff', 'Miniature Bull Terrier', 'Miniature Pinscher', 'Miniature Schnauzer', 'Newfoundland', 'Norfolk Terrier', 'Norwegian Elkhound', 'Norwich Terrier', 'Old English Sheepdog', 'Otterhound', 'Papillon', 'Pekingese', 'Pembroke Welsh Corgi', 'Petit Basset Griffon Vendeen', 'Pharaoh Hound', 'Pointer', 'Pomeranian', 'Poodle (Miniature)', 'Poodle (Standard)', 'Poodle (Toy)', 'Portuguese Water Dog', 'Pug', 'Puli', 'Rhodesian Ridgeback', 'Rottweiler', 'Saint Bernard', 'Saluki (or Gazelle Hound)', 'Samoyed', 'Schipperke', 'Scottish Deerhound', 'Scottish Terrier', 'Sealyham Terrier', 'Shetland Sheepdog', 'Shiba Inu', 'Shih Tzu', 'Siberian Husky', 'Silky Terrier', 'Skye Terrier', 'Smooth Fox Terrier', 'Soft Coated Wheaten Terrier', 'Spinone Italiano', 'Staffordshire Bull Terrier', 'Standard Schnauzer', 'Sussex Spaniel', 'Tibetan Spaniel', 'Tibetan Terrier', 'Vizsla', 'Weimaraner', 'Welsh Springer Spaniel', 'Welsh Terrier', 'West Highland White Terrier', 'Whippet', 'Wire Fox Terrier', 'Wirehaired Pointing Griffon', 'Yorkshire Terrier'];
var CAT_BREEDS = ['Abyssinian', 'American Bobtail', 'American Curl', 'American Shorthair', 'American Wirehair', 'Balinese', 'Bengal', 'Birman', 'Bombay', 'British Shorthair', 'Burmese', 'Chartreux', 'Cornish Rex', 'Cymric', 'Devon Rex', 'Egyptian Mau', 'Exotic Shorthair', 'Havana Brown', 'Himalayan', 'Japanese Bobtail', 'Javanese', 'Korat ', 'Maine Coon', 'Manx', 'Munchkin', 'Nebelung', 'Norwegian Forest Cat', 'Ocicat', 'Oriental', 'Persian', 'Ragdoll', 'Russian Blue', 'Scottish Fold', 'Selkirk Rex', 'Siamese', 'Siberian', 'Singapura', 'Snowshoe', 'Somali', 'Sphynx', 'Tonkinese', 'Turkish Angora', 'Turkish Van'];
var NAMES = ['Acorn', 'Alvin', 'Asia', 'Audi', 'Bagel', 'Balou', 'Barclay', 'Barney', 'Beck', 'Bellatrix', 'Bianca', 'Biloxi', 'Birdie', 'Biscuit', 'Blanca', 'Bobbafett', 'Bodie', 'Bono', 'Booboo', 'Bootsie', 'Bordeaux', 'Brandy', 'Bren', 'Bronco', 'Bruin', 'Bubbles', 'Buffy', 'Burt', 'Butler', 'Button', 'Calvin', 'Candy', 'Carter', 'Cece', 'Cessa', 'Chandler', 'Chaucer', 'Chevy', 'China', 'Choochoo', 'Cisco', 'Claire', 'Cleopatra', 'Clooney', 'Coco(nut)', 'Connor', 'Cosmo', 'Crosby', 'Cupcake', 'Daisy', 'Dallas', 'Daphne', 'Delilah', 'Diva', 'Doc', 'Domino', 'Donna', 'Donovan', 'Dulus', 'Dutch', 'Ebony', 'Ed', 'Elton', 'Elwood', 'Ernie', 'Faith', 'Faya', 'Felix', 'Fig', 'Fiona', 'Foxy', 'Fritz', 'Fuse', 'Giblet', 'Gibson', 'Gingi', 'Goofy', 'Graysen', 'Greystoke', 'Guinness', 'Hershey', 'Holly', 'Honey', 'Huck Finn', 'Hudson', 'Hutch', 'Ike', 'Indira', 'Iris', 'Ivory', 'Jade', 'Jasmine', 'Jasper', 'Jazzy', 'Jeeves', 'Jenna', 'Jenne', 'Joy', 'Kai', 'Kalua', 'Kaly', 'Kassie', 'Kaya', 'Keanna', 'Keesha', 'Keiko', 'Kiefer', 'Kingston', 'Koby', 'Kona', 'Laguna', 'Landon', 'Larissa', 'Lefty', 'Leia', 'Lexi', 'Lil’bit', 'Lilypie', 'Linus', 'Logan', 'Lola', 'Luca', 'Lucy', 'Luke', 'Madonna', 'Malble', 'Malibu', 'Margo', 'Marshmellow', 'Marti', 'Max', 'Maya', 'Meadow', 'Mercedes', 'Merlot', 'Merry', 'Mia', 'Midnight', 'Midori', 'Mika', 'Milan', 'Mira', 'Mischa', 'Mitzi', 'Moby', 'Mochi', 'Monet', 'Monkey', 'Mooshie', 'Mozart', 'Mr Big', 'Muggles', 'Mulder', 'Mulligan', 'Murphy', 'Mylo', 'Nanda', 'Nate', 'Nell', 'Niana', 'Nico', 'Noodle', 'Nugget', 'Olive', 'Onyx', 'Otis', 'Owen', 'Ozzie', 'Paddington', 'Paisley', 'Paris', 'Parker', 'Paulie', 'Pazzo', 'Peanut', 'Pearl', 'Pepper', 'Persia', 'Pesci', 'Phoenix', 'Picasso', 'Pinot', 'Pipsie', 'Pixie', 'Porche', 'Quattro', 'Ramona', 'Redford', 'Reece', 'Rico', 'Robin Hood', 'Rocco', 'Rocky', 'Romeo', 'Roxie', 'Rufus', 'Rusty', 'Scotty', 'Scout', 'Shadow', 'Shaggy', 'Shane', 'Shaq', 'Sheba', 'Silas', 'Skip', 'Skitty', 'Skyler', 'Smitty', 'Snooky', 'Snoopy', 'Sookie', 'Spark', 'Sprite', 'Stitch', 'Strsky', 'Sugar', 'Summer', 'Sunny', 'Sushi', 'Sweetpea', 'Syrah', 'Tallulah', 'Tango', 'Tank', 'Tanner', 'Tatertot', 'Theo', 'Tibbs', 'Timber', 'Tink', 'Toast', 'Toffee', 'Tonka', 'Vegas', 'Wednesday', 'Wilbur', 'Willow', 'Winnie', 'Wolfie', 'Yoshiko', 'Zach', 'Zara', 'Zeke', 'Zelda', 'Zeppelin', 'ZsaZsa'];
var SPECIES = ['dog', 'cat'];
module.exports = {
    __key: 'pet:'
};

//module.exports['pet:species'] = species;
module.exports['pet:breed'] = breed;
module.exports['pet:name'] = name;
module.exports['pet:age'] = age;
module.exports['pet:full'] = full;

function breed(deps, specie) {
    var breeds,
        specie = specie ? specie.toLowerCase() : '';
    switch (specie) {
        case 'dog':
            breeds = DOG_BREEDS;
            break;
        case 'cat':
            breeds = CAT_BREEDS;
            break;
        default:
            breeds = DOG_BREEDS.concat(CAT_BREEDS);
            break;
    }
    return breeds.randomValue();
}

// full can get breed then figure out specie

function name() {
    return NAMES.randomValue();
}

function age() {
    return Math.floor(Math.random() * 19) + 1;
}

function full(deps, specie) {
    specie = specie || SPECIES.randomValue();
    return {
        name: name(),
        age: age(),
        specie: specie,
        breed: breed(null, specie)
    };
}