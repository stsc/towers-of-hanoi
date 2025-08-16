function exchange(element, dropon, event) {
    let move = false, ring_top = 1, to_pos;

    let rings = new Array(3);
    let pos   = new Array(1,4);

    for (let i = 0; i < rings.length; i++) {
        rings[i] = new Array(pos[0], pos[1]);
        pos[0] += 4;
        pos[1] += 4;
    }

    GATHER_POS: for (let i = 0; i < rings.length; i++) {
        if (dropon.id >= rings[i][0]
         && dropon.id <= rings[i][1]
        ) {
            for (let c = rings[i][1]; c >= rings[i][0]; c--) {
                const div_inner = c + '_inner';
                const class_name = document.getElementById(div_inner).className;
                if (class_name == 'ring_blank') {
                    move = true;
                    to_pos = c;
                    break GATHER_POS;
                }
            }
        }
    }
    CHECK_IF_TOP: for (let i = 0; i < rings.length; i++) {
        if (element.parentNode.id >= rings[i][0]
         && element.parentNode.id <= rings[i][1]
        ) {
            for (let c = rings[i][1]; c >= rings[i][0]; c--) {
                const div_inner = c + '_inner';
                const class_name = document.getElementById(div_inner).className;
                if (class_name == 'ring_blank') {
                    ring_top = c + 1;
                    break CHECK_IF_TOP;
                } // allow for full stack to be emptied (unless final one)
                else if (c == rings[i][0] && element.parentNode.id != 9) {
                    ring_top = c;
                    break CHECK_IF_TOP;
                }
            }
        }
    }

    if (element.parentNode.id == ring_top  &&
        element.parentNode.id != dropon.id && (
        dropon.id % 4 == 0
          ? document.getElementById(dropon.id).firstChild.className == 'ring_blank'
          : Number(document.getElementById(Number(dropon.id) + 1).firstChild.textContent) > Number(element.textContent))
    ) {
        const from_id = element.parentNode.id;
        const to_id   = dropon.id;

        const from_class = $(from_id).firstChild.className;
        let to_class     = $(to_id).firstChild.className;

        const from_text = $(from_id).firstChild.textContent;
        let to_text     = $(to_id).firstChild.textContent;

        const from_inner = from_id + '_inner';
        let to_inner     = to_id   + '_inner';

        if (move) {
            to_inner = to_pos + '_inner';
            to_class = 'ring_blank';
            to_text  = '0';
        }

        document.getElementById(from_inner).className = to_class;
        document.getElementById(to_inner).className   = from_class;

        document.getElementById(from_inner).textContent = to_text;
        document.getElementById(to_inner).textContent   = from_text;

        const moves = Number(document.getElementById('moves').textContent) + 1;

        if (dropon.id == 9) {
            for (let id = 9; id <= 12; id++) {
                document.getElementById(id).firstChild.style.backgroundColor = 'darkcyan';
            }
            if (moves == 15) {
                document.getElementById('optimum').textContent = 'OPTIMUM';
            }
        }

        document.getElementById('moves').textContent = moves;

        document.getElementById('progress').textContent = dropon.id == 9 ? 'DONE!' : 'SOLVING..';
    }
}
